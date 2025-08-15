########################
# This stored procedure returns the top rated breweries
# IDEA: implement a range of scores
########################

drop procedure if exists top_brewery;
delimiter $$
create procedure top_brewery(IN target_score decimal(2,1), IN inState varchar(25), IN inStyle varchar(100), IN offsetAmt int)
begin
if inState IS NULL THEN
	set inState = '%';
end if;

if inStyle IS NULL THEN
	set inStyle = '%';
end if;
select brewery.brewery_id, max(brewery.name) 'name' , avg(reviews.overall_score) 'avg', avg(reviews.palette_score) 'avg_pal',avg(reviews.aroma_score) 'avg_aroma', avg(reviews.taste_score) 'avg_taste'
from reviews
	inner join beer
      on reviews.beer_id = beer.beer_id
        and beer.style LIKE inStyle
	inner join brewery
      on beer.brewery_id = brewery.brewery_id
		and brewery.state LIKE inState
group by brewery.brewery_id
having avg(reviews.overall_score) > target_score
ORDER BY avg(reviews.overall_score) DESC
LIMIT 10 OFFSET offsetAmt;
end $$
delimiter ;
