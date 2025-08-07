########################
# This stored procedure returns the top rated beers
#
########################

drop procedure if exists top_beers;
delimiter $$
create procedure top_beers(IN target_score decimal(2,1), IN offsetAmt int)
begin
select beer.beer_id , max(beer.Name) 'max', avg(reviews.overall_score) 'avg'
from reviews
	left outer join beer
      on reviews.beer_id = beer.beer_id
group by beer.beer_id
having avg(reviews.overall_score) >= target_score
ORDER BY avg(reviews.overall_score) DESC
LIMIT 10 OFFSET offsetAmt;
end $$
delimiter ;
