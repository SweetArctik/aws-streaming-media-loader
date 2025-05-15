import boto3
import os

aws_access_key = os.getenv("AWS_ACCESS_KEY_ID")
aws_secret_key = os.getenv("AWS_SECRET_ACCESS_KEY")
region = os.getenv("AWS_REGION")
bucket_name = os.getenv("BUCKET_NAME")

s3 = boto3.client(
    "s3",
    aws_access_key_id=aws_access_key,
    aws_secret_access_key=aws_secret_key,
    region_name=region
)

def list_bucket_files():
    response = s3.list_objects_v2(Bucket=bucket_name)
    files = response.get("Contents", [])
    return [f"https://{bucket_name}.s3.{region}.amazonaws.com/{file['Key']}" for file in files]
