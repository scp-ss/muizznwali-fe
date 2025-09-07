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
    Vercel serverless function handler for adding/updating Firebase data.
    Expected body: JSON with data to add/update
    Query parameters: collection (optional, defaults to 'data'), data_id (optional for updates)
    """
    try:
        # Get request body
        body = event.get('body', '{}')
        if isinstance(body, str):
            data = json.loads(body)
        else:
            data = body or {}

        if not data:
            return {
                'statusCode': 400,
                'body': '{"error": "Request body is required"}',
                'headers': {'Content-Type': 'application/json'}
            }

        query_params = event.get('queryStringParameters', {}) or {}
        collection = query_params.get('collection', 'data')
        data_id = query_params.get('data_id')

        if data_id:
            # Update existing document
            doc_ref = db.collection(collection).document(data_id)
            doc_ref.set(data, merge=True)
            message = f"Document {data_id} updated successfully"
        else:
            # Add new document
            doc_ref = db.collection(collection).add(data)
            data_id = doc_ref[1].id
            message = f"Document added successfully with ID: {data_id}"

        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': message,
                'id': data_id,
                'collection': collection
            }),
            'headers': {'Content-Type': 'application/json'}
        }

    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'body': '{"error": "Invalid JSON in request body"}',
            'headers': {'Content-Type': 'application/json'}
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': f'{{"error": "Failed to save data: {str(e)}"}}',
            'headers': {'Content-Type': 'application/json'}
        }