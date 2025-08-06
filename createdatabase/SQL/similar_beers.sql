set @beer_id = 3;

select *
from beer b1
join beer b2
  on b1.beer_id < b2.beer_id
  and b1.style = b2.style
  and b1.abv = b2.abv
where b1.beer_id = @beer_id