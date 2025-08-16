########################
# This stored procedure returns the top rated beers
#
########################

drop procedure if exists top_beers;
delimiter $$
create procedure top_beers(IN target_score decimal(2,1),IN inStyle varchar(100), IN offsetAmt int)
begin
if inStyle IS NULL THEN
	set inStyle = '%';
end if;

select beer.beer_id , max(beer.Name) 'Name', avg(reviews.overall_score) 'avg'
from reviews
	inner join beer
      on reviews.beer_id = beer.beer_id
where beer.style LIKE CONCAT('%', inStyle, '%')
group by beer.beer_id
having avg(reviews.overall_score) >= target_score
ORDER BY avg(reviews.overall_score) DESC
LIMIT 12 OFFSET offsetAmt;
end $$
delimiter ;
