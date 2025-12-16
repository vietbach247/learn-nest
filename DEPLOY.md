# Hướng dẫn Deploy tự động lên Vercel

## Thiết lập GitHub Secrets

Để GitHub Actions có thể tự động deploy lên Vercel, bạn cần thêm các secrets sau vào GitHub repository:

### Bước 1: Lấy Vercel Token
1. Đăng nhập vào [Vercel Dashboard](https://vercel.com/dashboard)
2. Vào **Settings** → **Tokens**
3. Tạo token mới và copy lại

### Bước 2: Lấy Vercel Org ID và Project ID

**Cách 1: Qua Vercel CLI**
```bash
# Cài đặt Vercel CLI (nếu chưa có)
npm i -g vercel

# Link project với Vercel
vercel link

# Lấy thông tin project
vercel inspect
```

**Cách 2: Qua Vercel Dashboard**
1. Vào project trên Vercel Dashboard
2. Vào **Settings** → **General**
3. Copy **Org ID** và **Project ID**

### Bước 3: Thêm Secrets vào GitHub
1. Vào GitHub repository
2. Vào **Settings** → **Secrets and variables** → **Actions**
3. Thêm 3 secrets sau:
   - `VERCEL_TOKEN`: Token từ bước 1
   - `VERCEL_ORG_ID`: Org ID từ bước 2
   - `VERCEL_PROJECT_ID`: Project ID từ bước 2

## Cách hoạt động

Sau khi thiết lập secrets, mỗi khi bạn push code lên nhánh `main`, GitHub Actions sẽ:
1. ✅ Checkout code
2. ✅ Setup Node.js và cache dependencies
3. ✅ Install dependencies với yarn
4. ✅ Build project
5. ✅ Deploy lên Vercel production

## Kiểm tra deployment

- Xem logs deployment: Vào tab **Actions** trong GitHub repository
- Xem deployment trên Vercel: Vào Vercel Dashboard → **Deployments**

