FROM php:8.4-cli
ENV NODE_VERSION=25.2.1

COPY . /usr/src/docupet/
WORKDIR /usr/src/docupet/

# For debugging mysql connection
RUN apt update && apt install default-mysql-client curl -y

# Composer Install
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Symfony CLI Tool
RUN curl -sS https://get.symfony.com/cli/installer | bash
RUN mv /root/.symfony5/bin/symfony /usr/local/bin/symfony

# PHP Extensions
ADD --chmod=0755 https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN install-php-extensions pdo_mysql zip

RUN composer install

# Now Node Stuff
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version
RUN npm install
RUN npm run build


CMD ["symfony", "server:start", "--allow-all-ip"]
