call top_brewery(4,0);
call top_beers(4,50);
call similar_beers(3);
call user_review_diff('northyorksammy');
call top_beer_by_brew(2);
call top_reviewers(0);
select * from favoritebeers;
call insert_fav(12, 'northyorksammy');
#call insert_fav(-10, 'notindatabase');
select * from favoritebeers;
call user_favorites('northyorksammy');
call find_breweries('wisconsin', 'American IPA');
call most_favorited();
call beer_fav(12);
call insert_beer("busch apple", "amber", 4.2, 1);
select *
from beer
where beer_id in (select max(beer_id) from beer);
delete from brewery where brewery_id = 30308;

select count(*) from brewery;
call insert_brewery("tylers brew", "wisconsin", "cool", "website", "n3234", 1);
select count(*) from brewery;
select * from brewery where Name like 'tylers%'

call insert_review('northyorksammy', 12, current_timestamp(),5, 5,5, 5,5);