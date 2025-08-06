set @target_score = 4;

select beer.brewery_id, max(beer.Name), avg(reviews.overall_score)
from reviews
	left outer join beer
      on reviews.beer_id = beer.beer_id
group by beer.beer_id
having avg(reviews.overall_score) > @target_score
ORDER BY avg(reviews.overall_score) DESC
LIMIT 10