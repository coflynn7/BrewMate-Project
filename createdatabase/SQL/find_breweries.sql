########################
# This stored procedure to find a brewery you like.
# optionally takes in a state or beer style
#
########################
drop procedure if exists find_breweries;
delimiter $$
create procedure find_breweries(IN inState varchar(25), IN inStyle varchar(100))
begin
if inState IS NULL THEN
	set inState = '%';
end if;

if inStyle IS NULL THEN
	set inStyle = '%';
end if;

select max(brewery.Name), avg(overall_score), avg(palette_score),avg(aroma_score), avg(taste_score)
from brewery
	inner join beer
      on brewery.brewery_id = beer.brewery_id
        and beer.style = inStyle
	inner join reviews
      on beer.beer_id = reviews.beer_id
where brewery.state = inState
GROUP BY brewery.brewery_id
ORDER BY avg(overall_score) DESC
Limit 100;
end $$
delimiter ;