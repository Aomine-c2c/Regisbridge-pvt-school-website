FROM nginx:1.27-alpine

# Copy customized Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Create mount points for static and media volumes
RUN mkdir -p /var/www/uploads /var/www/django_static /var/www/media /run/regisbridge

ENTRYPOINT ["/entrypoint.sh"]
