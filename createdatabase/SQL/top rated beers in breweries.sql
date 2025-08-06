set @brewery_id = 2;

select max(brewery.Name), max(beer.Name), avg(overall_score), avg(palette_score),avg(aroma_score), avg(taste_score)
from brewery
	inner join beer
      on brewery.brewery_id = beer.brewery_id
	inner join reviews
      on beer.beer_id = reviews.beer_id
where brewery.brewery_id = @brewery_id
GROUP BY beer.beer_id
ORDER BY avg(overall_score) DESC
Limit 3;