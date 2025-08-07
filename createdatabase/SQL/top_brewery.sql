########################
# This stored procedure returns the top rated breweries
# IDEA: implement a range of scores
########################

drop procedure if exists top_brewery;
delimiter $$
create procedure top_brewery(IN target_score decimal(2,1), IN offsetAmt int)
begin
select brewery.brewery_id, max(brewery.name), avg(reviews.overall_score)
from reviews
	left outer join beer
      on reviews.beer_id = beer.beer_id
	left outer join brewery
      on beer.brewery_id = brewery.brewery_id
group by brewery.brewery_id
having avg(reviews.overall_score) > target_score
ORDER BY avg(reviews.overall_score) DESC
LIMIT 10 OFFSET offsetAmt;
end $$
delimiter ;
