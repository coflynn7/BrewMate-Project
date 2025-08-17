select * from brewery limit 10;
call top_brewery(4,null,null,0);
select * from beer limit 10;
call top_beers(4,null,50);
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
call insert_beer("busch apple", "amber", 4.4, 1);
select *
from beer
where beer_id in (select max(beer_id) from beer);
delete from brewery where brewery_id = 30308;

select count(*) from brewery;
call insert_brewery("tylers brew 5 ", "wisconsin", "cool", "website", "n3234", 1);
select count(*) from brewery;
select * from brewery where Name like 'tylers%';
call insert_review('northyorksammy', 12, current_timestamp(),5, 5,5, 5,5);
call beer_info(3);
call beer_search_name('non-existant beer');
select * from reviews limit 2;
call delete_review(1);
select * from reviews limit 2;

select * from favoritebeers;
call delete_fav(12, 'northyorksammy');
select * from favoritebeers;