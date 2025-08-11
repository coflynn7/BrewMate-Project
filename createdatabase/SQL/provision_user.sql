-- For a user connecting from any host:
CREATE USER 'node_user'        IDENTIFIED BY 'S3cureP@ssw0rd';

-- Grant all rights on a single database:
GRANT ALL PRIVILEGES ON beermate.* TO 'node_user';

