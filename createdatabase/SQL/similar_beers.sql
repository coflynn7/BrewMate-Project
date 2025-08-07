########################
# This stored procedure returns similar beers to the input beer
#
########################

drop procedure if exists similar_beers;
delimiter $$
create procedure similar_beers(IN beerid bigint)
begin
select *
from beer b1
join beer b2
  on b1.beer_id < b2.beer_id
  and b1.style = b2.style
  and b1.abv = b2.abv
where b1.beer_id = beerid;
end $$
delimiter ;
