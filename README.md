# GitMatch

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/gitmatch.git
cd gitmatch
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## ✨ Features

- 🔍 Search and view GitHub profiles with detailed statistics
- 📊 Compare up to 3 profiles side by side
- 📱 Responsive design that works on desktop and mobile
- 🌙 Dark mode support
- 🚀 Fast and efficient with GitHub's REST API
- 🎨 Modern UI with Tailwind CSS and Radix UI

### 🔒 Security Features

- **Rate Limiting**

  - 30 requests per minute per IP
  - Prevents API abuse and ensures fair usage
  - Automatic rate limit detection and user feedback

- **Smart Caching**

  - 5-minute cache for profile data
  - Separate caching for repository stars
  - Automatic cache cleanup
  - Improved response times

- **Error Handling**
  - Graceful error messages
  - Rate limit notifications
  - API failure handling
  - Input validation

## 🛣️ Roadmap

### Upcoming Features

- [ ] Repository analytics and insights
- [ ] Contribution calendar visualization
- [ ] Language usage statistics
- [ ] Organization profile support
- [ ] Export comparison results
- [ ] Custom comparison metrics
- [ ] Profile bookmarking
- [ ] Advanced filtering options

### Performance Improvements

- [x] Implement caching for frequently accessed profiles
- [ ] Add pagination for large datasets
- [x] Optimize API calls with request batching
- [x] Add loading skeletons for better UX

### UI Enhancements

- [ ] Add more chart types for statistics
- [ ] Implement drag-and-drop profile comparison
- [ ] Add profile sharing functionality
- [ ] Improve mobile responsiveness
- [ ] Add more theme options

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- UI Components from [Radix UI](https://www.radix-ui.com)
- Icons from [Lucide Icons](https://lucide.dev)
