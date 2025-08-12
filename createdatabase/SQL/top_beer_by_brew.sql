########################
# This stored procedure returns the top beers for a brewery
#
########################
drop procedure if exists top_beer_by_brew;
delimiter $$
create procedure top_beer_by_brew(IN breweryid bigint)
begin
select max(brewery.Name), max(beer.Name), avg(overall_score), avg(palette_score),avg(aroma_score), avg(taste_score)
from brewery
	inner join beer
      on brewery.brewery_id = beer.brewery_id
	inner join reviews
      on beer.beer_id = reviews.beer_id
where brewery.brewery_id = breweryid
GROUP BY beer.beer_id
ORDER BY avg(overall_score) DESC
Limit 3;
end $$
delimiter ;