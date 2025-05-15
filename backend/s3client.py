import boto3
import os
from dotenv import load_dotenv

load_dotenv()

session = boto3.session.Session(
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_REGION")
)

s3 = session.client("s3")
BUCKET_NAME = os.getenv("AWS_BUCKET_NAME")

def list_bucket_files():
    response = s3.list_objects_v2(Bucket=BUCKET_NAME)
    contents = response.get("Contents", [])
    return [item["Key"] for item in contents]