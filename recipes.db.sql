CREATE TABLE Recipes (
    id INTEGER PRIMARY KEY,
    category varchar(255),
    recipe_name varchar(511)
);

CREATE TABLE Ingredients (
    id INTEGER PRIMARY KEY,
    ingredient_name varchar(255)
);

CREATE TABLE rec_ing (
    rec_id INT,
    ing_id INT,
    amount INT,
    measerument varchar(255),
    extra varchar(511),
    FOREIGN KEY (rec_id) REFERENCES Recipes(id),
    FOREIGN KEY (ing_id) REFERENCES Ingredients(id)
);

CREATE TABLE Instructions (
    step INT,
    instruction TEXT,
    rec_id INT,
    PRIMARY KEY (step, rec_id),
    FOREIGN KEY (rec_id) REFERENCES Recipes(id)
);