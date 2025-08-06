set @username = 'northyorksammy';
select style, count(*), avg(reviews.overall_score)
from reviews
	INNER JOIN beer
		on reviews.beer_id = beer.beer_id
where reviews.username = @username
group by beer.style;