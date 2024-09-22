CREATE TABLE Recipes (
    id INTEGER PRIMARY KEY,
    category varchar(255),
    recipe_name varchar(511),
    portions INT
);

CREATE TABLE Ingredients (
    id INTEGER PRIMARY KEY,
    rec_id INT,
    ingredient_name varchar(255),
    amount INT,
    measurement varchar(255),
    extra varchar(511),
    FOREIGN KEY (rec_id) REFERENCES Recipes(id)
);

CREATE TABLE Instructions (
    step INT,
    instruction TEXT,
    rec_id INT,
    PRIMARY KEY (step, rec_id),
    FOREIGN KEY (rec_id) REFERENCES Recipes(id)
);