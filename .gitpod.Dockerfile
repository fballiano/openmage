FROM gitpod/workspace-mysql

USER gitpod

RUN sudo apt-get -q update
RUN sudo apt-get install php8.1-soap -y
RUN sudo apt-get purge composer -y

RUN mkdir ~/bin
RUN echo "export PATH=$PATH:'~/bin'" >> ~/.bashrc
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php composer-setup.php && \
    php -r "unlink('composer-setup.php');" && \
    mv composer.phar ~/bin/composer
RUN wget https://files.magerun.net/n98-magerun.phar && \
    chmod +x ./n98-magerun.phar && \
    mv n98-magerun.phar ~/bin/n98-magerun