# Chatify Frontend

Ứng dụng chat frontend hiện đại và responsive được xây dựng bằng Next.js, React và TypeScript. Dự án này cung cấp một giao diện thân thiện với người dùng cho nhắn tin thời gian thực với trọng tâm vào hiệu suất và trải nghiệm nhà phát triển.

*A modern, responsive chat application frontend built with Next.js, React, and TypeScript. This project provides a user-friendly interface for real-time messaging with a focus on performance and developer experience.*

---

## 🚀 Tính Năng (Features)

- **Stack Frontend Hiện Đại**: Được xây dựng bằng Next.js 16.2.6 và React 19.2.4
  - *Modern Frontend Stack: Built with Next.js 16.2.6 and React 19.2.4*

- **Hỗ Trợ TypeScript**: An toàn đầy đủ kiểu dữ liệu với TypeScript 5
  - *TypeScript Support: Full type safety with TypeScript 5*

- **Styling**: Tailwind CSS 4 cho thiết kế utility-first responsive
  - *Styling: Tailwind CSS 4 for utility-first responsive design*

- **Chất Lượng Code**: ESLint được cấu hình để duy trì các tiêu chuẩn code
  - *Code Quality: ESLint configured for maintaining code standards*

- **Phát Triển Nhanh**: Hot reload được kích hoạt cho chu kỳ phát triển nhanh
  - *Fast Development: Hot reload enabled for rapid development cycles*

- **Sản Xuất**: Các bản dựng được tối ưu hóa và sẵn sàng triển khai
  - *Production Ready: Optimized builds and deployment-ready*

---

## 📋 Yêu Cầu (Prerequisites)

Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt những điều sau:
- Node.js (phiên bản 18 trở lên)
- npm, yarn, pnpm hoặc bun package manager

*Before you begin, ensure you have the following installed:*
- *Node.js (version 18 or higher)*
- *npm, yarn, pnpm, or bun package manager*

---

## 🛠️ Cài Đặt (Installation)

### 1. Sao chép repository (Clone the repository)
```bash
git clone https://github.com/lannguyen151005/chatify_frontend.git
cd chatify_frontend
```

### 2. Cài đặt các dependency (Install dependencies)
```bash
npm install
# hoặc (or)
yarn install
# hoặc (or)
pnpm install
# hoặc (or)
bun install
```

---

## 💻 Phát Triển (Development)

### Khởi động máy chủ phát triển (Start the development server)

```bash
npm run dev
# hoặc (or)
yarn dev
# hoặc (or)
pnpm dev
# hoặc (or)
bun dev
```

Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt để xem ứng dụng.

*Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.*

### Chỉnh sửa và tải lại nóng (Edit and hot reload)

Ứng dụng sẽ tự động tải lại khi bạn sửa đổi tệp. Bắt đầu chỉnh sửa bằng cách sửa đổi `app/page.tsx` để xem các thay đổi trong thời gian thực.

*The application will automatically reload when you modify files. Start editing by modifying `app/page.tsx` to see changes in real-time.*

### Kiểm Tra Mã (Linting)

Chạy ESLint để kiểm tra chất lượng code:

*Run ESLint to check code quality:*

```bash
npm run lint
```

---

## 🏗️ Xây Dựng (Build)

### Tạo bản dựng sản xuất được tối ưu hóa (Create an optimized production build)

```bash
npm run build
```

### Khởi động máy chủ sản xuất (Start the production server)

```bash
npm start
```

---

## 📦 Cấu Trúc Dự Án (Project Structure)

```
chatify_frontend/
├── app/                    # Next.js App Router directory
├── public/                 # Static assets (Tài nguyên tĩnh)
├── node_modules/          # Project dependencies (Các dependency của dự án)
├── package.json           # Project metadata and dependencies
├── tsconfig.json          # TypeScript configuration (Cấu hình TypeScript)
├── tailwind.config.js     # Tailwind CSS configuration (Cấu hình Tailwind CSS)
├── .eslintrc.json         # ESLint configuration (Cấu hình ESLint)
└── README.md              # This file
```

---

## 🎨 Stack Công Nghệ (Technology Stack)

| Công Nghệ | Phiên Bản | Mục Đích |
|-----------|---------|---------|
| Next.js | 16.2.6 | React framework với SSR/SSG |
| React | 19.2.4 | Thư viện UI (UI library) |
| React DOM | 19.2.4 | Rendering React cho web |
| TypeScript | ^5 | JavaScript an toàn kiểu (Type-safe JavaScript) |
| Tailwind CSS | ^4 | CSS framework utility-first |
| ESLint | ^9 | Kiểm tra mã và chất lượng (Code linting) |
| PostCSS | ^4 | CSS transformations |

---

## 📊 Thành Phần Ngôn Ngữ (Language Composition)

- **TypeScript**: 78.3%
- **JavaScript**: 11.6%
- **CSS**: 10.1%

---

## 🔧 Các Tệp Cấu Hình (Configuration Files)

- **package.json**: Project dependencies và scripts
- **tsconfig.json**: Các tùy chọn trình biên dịch TypeScript
- **tailwind.config.js**: Tùy chỉnh Tailwind CSS
- **.eslintrc.json**: Các quy tắc và cấu hình ESLint

---

## 📝 Script Khả Dụng (Available Scripts)

| Script | Mô Tả |
|--------|-------------|
| `npm run dev` | Khởi động máy chủ phát triển (Start development server) |
| `npm run build` | Tạo bản dựng sản xuất (Create production build) |
| `npm start` | Khởi động máy chủ sản xuất (Start production server) |
| `npm run lint` | Chạy ESLint để kiểm tra code |

---

## 🚀 Triển Khai (Deployment)

### Triển khai trên Vercel (Khuyến nghị) (Deploy on Vercel - Recommended)

Cách dễ nhất để triển khai ứng dụng Next.js của bạn là sử dụng [Nền tảng Vercel](https://vercel.com).

*The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com).*

#### Các bước (Steps):

1. **Đẩy mã lên repository Git** (Push your code to a Git repository)
   - GitHub, GitLab, hoặc Bitbucket

2. **Truy cập Vercel** (Visit Vercel)
   - Tham quan [Vercel](https://vercel.com) và tạo một dự án mới

3. **Chọn repository của bạn** (Select your repository)
   - Kết nối tài khoản Git của bạn

4. **Cấu hình tự động** (Automatic configuration)
   - Vercel sẽ tự động phát hiện Next.js và cấu hình các thiết lập xây dựng

5. **Triển khai** (Deploy)
   - Triển khai bằng một cú nhấp chuột

Để tìm thêm các tùy chọn triển khai, hãy kiểm tra [tài liệu triển khai Next.js](https://nextjs.org/docs/app/building-your-application/deploying).

*For more deployment options, check the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).*

---

## 📚 Tài Nguyên Học Tập (Learning Resources)

- [Tài liệu Next.js](https://nextjs.org/docs) - Tìm hiểu về các tính năng và API của Next.js
  - *[Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API*

- [Tài liệu React](https://react.dev) - Các khái niệm và best practices của React
  - *[React Documentation](https://react.dev) - React concepts and best practices*

- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Tham chiếu ngôn ngữ TypeScript
  - *[TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript language reference*

- [Tài liệu Tailwind CSS](https://tailwindcss.com/docs) - Hướng dẫn các lớp CSS utility
  - *[Tailwind CSS Documentation](https://tailwindcss.com/docs) - CSS utility classes guide*

- [Learn Next.js](https://nextjs.org/learn) - Hướng dẫn Next.js tương tác
  - *[Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial*

---

## 🤝 Đóng Góp (Contributing)

Chúng tôi hoan nghênh các đóng góp! Vui lòng tự do:

*Contributions are welcome! Please feel free to:*

1. **Fork repository**
   - Tạo một bản sao của repository

2. **Tạo nhánh tính năng** (Create a feature branch)
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Commit các thay đổi của bạn** (Commit your changes)
   ```bash
   git commit -m 'Add amazing feature'
   ```

4. **Đẩy đến nhánh** (Push to the branch)
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Mở một Pull Request** (Open a Pull Request)
   - Mô tả chi tiết về những thay đổi của bạn

---

## 📄 Giấy Phép (License)

Dự án này không có giấy phép được chỉ định. Vui lòng liên hệ với chủ sở hữu repository để biết thông tin giấy phép.

*This project does not have a specified license. Please check with the repository owner for licensing information.*

---

## 👤 Tác Giả (Author)

- **GitHub**: [@lannguyen151005](https://github.com/lannguyen151005)

---

## 📞 Hỗ Trợ (Support)

Để báo cáo vấn đề, câu hỏi hoặc gợi ý, vui lòng mở một [issue](https://github.com/lannguyen151005/chatify_frontend/issues) trên GitHub.

*For issues, questions, or suggestions, please open an [issue](https://github.com/lannguyen151005/chatify_frontend/issues) on GitHub.*

---

**Cập Nhật Lần Cuối (Last Updated)**: May 28, 2026

**Status**: Active Development 🚀

Made with ❤️ by the Chatify team
