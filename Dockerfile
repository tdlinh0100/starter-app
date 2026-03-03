# ============================================
# Dockerfile chuẩn production — Best Practices
# ============================================
FROM node:20-alpine

WORKDIR /app

# Copy package files trước (tối ưu layer caching)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source code
COPY . .

# Chạy ứng dụng với user không root
USER node

# Mở cổng ứng dụng
EXPOSE 3000

# Thiết lập health check để Docker có thể kiểm tra tình trạng container
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --spider http://localhost:3000/health || exit 1

CMD ["node", "src/index.js"]
