terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ap-northeast-2"
}

# CloudFront용 인증서는 반드시 us-east-1에 있어야 함
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}
