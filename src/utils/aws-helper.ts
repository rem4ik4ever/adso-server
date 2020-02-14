import AWS from "aws-sdk";
import { Field, ObjectType } from "type-graphql";

const s3Bucket = "adso-bucket";

@ObjectType()
export class S3SignedResponse {
  @Field()
  signedRequest: string;

  @Field()
  url: string;
}

/**
 * Get Signed URL to upload file to S3 bucket
 *
 * @param param0 FileUploadInput
 */
export const getS3SignedUrl = async (
  filename: string,
  filetype: string
): Promise<S3SignedResponse> => {
  const s3 = new AWS.S3({
    signatureVersion: "v4",
    region: "us-east-2",
    accessKeyId: process.env.ADSO_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.ADSO_AWS_SECRET_ACCESS_KEY
  });

  const s3Parms = {
    Bucket: s3Bucket,
    Key: filename,
    Expires: 60,
    ContentType: filetype,
    ACL: "public-read"
  };

  const signedRequest = await s3.getSignedUrl("putObject", s3Parms);
  const url = `https://${s3Bucket}.s3.amazonaws.com/${filename}`;

  return {
    signedRequest,
    url
  };
};
