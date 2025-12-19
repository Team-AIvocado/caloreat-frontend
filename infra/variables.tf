variable "domain_name" {
  description = "Domain name for the frontend (e.g., caloreat.net)"
  type        = string
  default     = "caloreat.net"
}

variable "backend_alb_dns_name" {
  description = "DNS name of the Backend ALB"
  type        = string
  # 배포 시 입력 필요, 혹은 Data Source로 조회 가능
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default = {
    Project     = "caloreat"
    Environment = "production"
    Component   = "frontend"
  }
}
