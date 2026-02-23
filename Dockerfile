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

EXPOSE 3000

CMD ["node", "src/index.js"]
