# Next.js Route List

A command-line tool to scan and list all routes in your Next.js application, supporting both the App Router and Pages Router patterns.

## Features

- ✅ Supports Next.js App Router (`app` directory)
- ✅ Supports Next.js Pages Router (`pages` directory)
- ✅ Handles projects with `src` directory structure
- ✅ Supports TypeScript (`.tsx`) and JavaScript (`.js`) files
- ✅ Handles route groups `(...)` in App Router
- ✅ Clean and formatted output

## Installation

Install globally using your preferred package manager:

```bash
npm install -g @devalade/route-list
# or
yarn global add @devalade/route-list
# or
pnpm add -g @devalade/route-list
```

## Usage

Navigate to your Next.js project directory and run:

```bash
route-list
```

That's it! The tool will automatically scan your project and list all available routes.

## Example Output

```bash
Scanning Next.js routes...

Found App Router directory...
Found Pages Router directory...

Found routes:
- /
- /about
- /blog
- /blog/[slug]
- /contact
- /products/[category]/[id]

Total routes found: 6
```

## Supported Project Structures

The tool works with various Next.js project structures:

### Standard Structure
```
my-next-app/
├── app/                  # App Router
│   ├── page.tsx
│   └── about/
│       └── page.tsx
└── pages/               # Pages Router
    ├── index.tsx
    └── blog/
        └── index.tsx
```

### Src Directory Structure
```
my-next-app/
└── src/
    ├── app/            # App Router
    │   ├── page.tsx
    │   └── about/
    │       └── page.tsx
    └── pages/         # Pages Router
        ├── index.tsx
        └── blog/
            └── index.tsx
```

## Route Detection Rules

### App Router (`app` directory)
- Detects routes from files named `page.js` or `page.tsx`
- Handles route groups (folders starting with parentheses)
- Ignores files that aren't pages (like layout.tsx, loading.tsx)

### Pages Router (`pages` directory)
- Detects routes from `.js` and `.tsx` files
- Converts `index` files to root routes
- Maintains folder structure in route paths

## Troubleshooting

If you encounter any issues:

1. Ensure you're in a Next.js project directory
2. Verify that you have either an `app` or `pages` directory (or both)
3. Check if your project uses a `src` directory structure
4. Make sure you have read permissions for the project directory

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

[Devalade](https://github.com/devalade)

## Notes

- The tool ignores `node_modules` and hidden folders (starting with '.')
- Route paths are normalized to ensure consistent formatting
- Both App Router and Pages Router can coexist in the same project
