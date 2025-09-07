import os
import firebase_admin
from firebase_admin import credentials, firestore
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Firebase Admin SDK
if not firebase_admin._apps:
    # For Vercel, use service account key from environment
    service_account_key = os.getenv('FIREBASE_SERVICE_ACCOUNT_KEY')
    if service_account_key:
        import json
        cred = credentials.Certificate(json.loads(service_account_key))
    else:
        # Fallback to default credentials (for local development)
        cred = credentials.ApplicationDefault()

    firebase_admin.initialize_app(cred)

db = firestore.client()

def handler(event, context):
    """
    Vercel serverless function handler for deleting Firebase data.
    Expected query parameters: data_id, collection (optional, defaults to 'data')
    """
    try:
        # Get query parameters
        query_params = event.get('queryStringParameters', {}) or {}
        data_id = query_params.get('data_id')
        collection = query_params.get('collection', 'data')

        if not data_id:
            return {
                'statusCode': 400,
                'body': '{"error": "data_id parameter is required"}',
                'headers': {'Content-Type': 'application/json'}
            }

        # Delete document from Firestore
        doc_ref = db.collection(collection).document(data_id)
        doc_ref.delete()

        return {
            'statusCode': 200,
            'body': f'{{"message": "Document {data_id} deleted successfully from collection {collection}"}}',
            'headers': {'Content-Type': 'application/json'}
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': f'{{"error": "Failed to delete document: {str(e)}"}}',
            'headers': {'Content-Type': 'application/json'}
        }