FROM php:8.4-cli

COPY . /usr/src/docupet
WORKDIR /usr/src/docupet

# For debugging mysql connection
RUN apt update && apt install default-mysql-client -y

# Composer Install
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Symfony CLI Tool
RUN curl -sS https://get.symfony.com/cli/installer | bash
RUN mv /root/.symfony5/bin/symfony /usr/local/bin/symfony

# PHP Extensions
ADD --chmod=0755 https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN install-php-extensions pdo_mysql



ADD --chmod=0755 https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

RUN install-php-extensions gd xdebug




CMD ["symfony", "server:start", "--allow-all-ip"]
