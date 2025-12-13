output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.main.domain_name
}

output "s3_bucket_name" {
  value = aws_s3_bucket.frontend.id
}

output "website_url" {
  value = "https://${var.domain_name}"
}
