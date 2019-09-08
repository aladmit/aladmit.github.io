FROM ruby:2

WORKDIR /app

COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN bundle install --path vendor/bundle
COPY . /app

EXPOSE 4000

ENTRYPOINT ["bundle", "exec", "jekyll"]
