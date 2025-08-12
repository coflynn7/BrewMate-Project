SELECT DISTINCT
  b.brewery_id,
  b.name,
  b.state
FROM brewery AS b
INNER JOIN beer    AS be
  ON be.brewery_id = b.brewery_id
WHERE NOT EXISTS (
  SELECT 1
  FROM reviews AS r
  WHERE r.beer_id = be.beer_id
);

select *
from beer b
where not exists (select 1 from reviews where reviews.beer_id = b.beer_id)
