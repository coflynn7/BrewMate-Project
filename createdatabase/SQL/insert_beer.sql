select max(beer_id)
from beer;

insert into beer (Name, style, abv, brewery_id)
values ("busch", "amber", 4.2, 1005646546545);

select *
from beer
ORDER BY BEER_ID DESC