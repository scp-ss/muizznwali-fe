import os
import firebase_admin
from firebase_admin import credentials, firestore
from dotenv import load_dotenv
import json

# Load environment variables
load_dotenv()

# Initialize Firebase Admin SDK
if not firebase_admin._apps:
    service_account_key = os.getenv('FIREBASE_SERVICE_ACCOUNT_KEY')
    if service_account_key:
        import json as json_lib
        cred = credentials.Certificate(json_lib.loads(service_account_key))
    else:
        cred = credentials.ApplicationDefault()

    firebase_admin.initialize_app(cred)

db = firestore.client()

def handler(event, context):
    """
    Vercel serverless function handler for getting Firebase data.
    Expected query parameters: data_id, collection (optional, defaults to 'data')
    If no data_id, returns all documents in collection
    """
    try:
        query_params = event.get('queryStringParameters', {}) or {}
        data_id = query_params.get('data_id')
        collection = query_params.get('collection', 'data')

        if data_id:
            # Get specific document
            doc_ref = db.collection(collection).document(data_id)
            doc = doc_ref.get()
            if doc.exists:
                data = doc.to_dict()
                data['id'] = doc.id
                return {
                    'statusCode': 200,
                    'body': json.dumps(data),
                    'headers': {'Content-Type': 'application/json'}
                }
            else:
                return {
                    'statusCode': 404,
                    'body': '{"error": "Document not found"}',
                    'headers': {'Content-Type': 'application/json'}
                }
        else:
            # Get all documents in collection
            docs = db.collection(collection).stream()
            data_list = []
            for doc in docs:
                data = doc.to_dict()
                data['id'] = doc.id
                data_list.append(data)

            return {
                'statusCode': 200,
                'body': json.dumps(data_list),
                'headers': {'Content-Type': 'application/json'}
            }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': f'{{"error": "Failed to get data: {str(e)}"}}',
            'headers': {'Content-Type': 'application/json'}
        }