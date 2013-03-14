# Indigo Wish prototype

1. Install Nodejs http://nodejs.org/
2. Open terminal, and using git, ```git clone https://github.com/relaystudio/indigo```
3. ```cd indigo/proto/iwish/```
4. ```sudo npm install```
5. ```node app.js```

## Proto steps
The current user journey (Woman purchasing gifts for her mother from Heather's list) can be accessed from
```http://localhost:3000/proto/1``` and ends at ```http://localhost:3000/proto/5```

The first page is just a screenshot made interactive of the indigo.ca homepage. It can be scrolled and illustrates the new drawer area.

2. The user is looking to create a list for mother's day. There's a mothers day "feature" on the homepage (which we need to build, can be pretty minimal). The user drags one of those items from the mother's day feature onto the new list button. A new list gets made, and they name it for mother's day and their mom. One or two more items can get dragged into that list.

3. The user clicks into the list and goes into the full list view for the list they're making for their mom. The mom's facebook photo is shown however it will be on the comp, and there should be a "mother's day" date indicator somewhere near that header. On the right side, there's going to be some social activity from Heather Reisman's feed and list, including her making a list for mother's.

4. The user clicks into Heather's profile (not her list) and sees Heather's List of Lists, the different lists she's made, eg. "For the Table," "Mother's Day," etc. Is just kind of an overview about what someone else's profile will look like.

5. The user clicks into the Mother's Day list and sees the different mothers day items that Heather's added. They'll drag some of those items into the list for their mom.

6. Returns to the mom list with those new items in the list (same screen as #3), and then drags one or two of those items to the cart and "purchases," basically finishes up the prototype.
