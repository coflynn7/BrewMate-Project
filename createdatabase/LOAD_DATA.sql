USE beermate;
load data local infile 'C:/Users/Tyler/OneDrive/Documents/CS564/Beer_App/users.txt' into table users fields
terminated by '|' lines terminated by '\n';

load data local infile 'C:/Users/Tyler/OneDrive/Documents/CS564/Beer_App/breweries.txt' into table brewery fields
terminated by '|' lines terminated by '\n'
ignore 1 rows
(name, numLocations, type, address, website,state, brewery_id);


load data local infile 'C:/Users/Tyler/OneDrive/Documents/CS564/Beer_App/beers.txt' into table beer fields
terminated by '|' lines terminated by '\n'
ignore 1 rows
(beer_id, Name, style, abv, brewery_id);

load data local infile 'C:/Users/Tyler/OneDrive/Documents/CS564/Beer_App/reviews.txt' into table reviews fields
terminated by '|' lines terminated by '\n'
ignore 1 rows
(review_date, overall_score, aroma_score, appearance_score, username,palette_score, taste_score,beer_id, review_id);

