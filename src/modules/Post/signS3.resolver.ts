import { Resolver, Mutation, Arg } from "type-graphql";
import { getS3SignedUrl, S3SignedResponse } from "../../utils/aws-helper";

@Resolver()
export class SignS3Resolver {
  @Mutation(() => S3SignedResponse)
  async signS3(
    @Arg("filename") filename: string,
    @Arg("filetype") filetype: string
  ): Promise<S3SignedResponse> {
    return await getS3SignedUrl(filename, filetype);
  }
}
