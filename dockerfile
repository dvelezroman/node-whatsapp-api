FROM node:20-alpine as node

WORKDIR /app

# Install Chromium and dependencies
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn

# Skip Chromium download and specify the executable path
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Copy application files and install dependencies
COPY . .
RUN npm install puppeteer@23.1.1 && npm install

# Build the application
RUN npm run build

# Add non-privileged user and set permissions
RUN addgroup -S pptruser && adduser -S -G pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads /app \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

# Switch to non-privileged user
USER pptruser

# Set environment variables
ARG PUBLIC_URL
ARG PORT

# Start the application
CMD ["npm", "start"]
