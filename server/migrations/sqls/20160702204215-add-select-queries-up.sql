CREATE OR REPLACE FUNCTION empires.get_provinces(
    IN i_visible BOOLEAN)
RETURNS JSON AS
$BODY$
SELECT
    array_to_json(array_agg(row_to_json(p)))
FROM
    (SELECT
        ep.pname,
        ep.display,
        ep.level,
        ep.regent,
        ep.loyalty,
        ep.domain,
        ep.abbr
    FROM empires.provinces ep WHERE (i_visible IS TRUE AND ep.visible=true) OR (i_VISIBLE IS NOT TRUE AND TRUE)) p;
$BODY$
LANGUAGE SQL;

CREATE OR REPLACE FUNCTION empires.get_persons() RETURNS JSON AS
$BODY$
SELECT
    array_to_json(array_agg(row_to_json(p)))
FROM
    (SELECT
        ep.pname,
        ep.display
    FROM empires.persons ep) p;
$BODY$
LANGUAGE SQL;

CREATE OR REPLACE FUNCTION empires.get_holdings() RETURNS JSON AS
$BODY$
SELECT
    array_to_json(array_agg(row_to_json(p)))
FROM
    (SELECT
        eh.holding_id,
        eh.level,
        eh.owner,
        eh.province,
        eh.type
    FROM empires.holdings eh) p;
$BODY$
LANGUAGE SQL;

CREATE OR REPLACE FUNCTION empires.get_organizations() RETURNS JSON AS
$BODY$
SELECT
    array_to_json(array_agg(row_to_json(p)))
FROM
    (SELECT
        eo.oname,
        eo.display,
        eo.owner,
        eo.abbr,
        eo.treasury
    FROM empires.organizations eo) p;
$BODY$
LANGUAGE SQL;

CREATE OR REPLACE FUNCTION empires.get_domains() RETURNS JSON AS
$BODY$
SELECT
    array_to_json(array_agg(row_to_json(d)))
FROM
    (SELECT
        ed.dname,
        ed.regent,
        ed.display,
        ed.abbr,
        ed.treasury
    FROM empires.domains ed) d;
$BODY$
LANGUAGE SQL;

CREATE OR REPLACE FUNCTION empires.get_br_data(
    IN i_visible    BOOLEAN DEFAULT TRUE)
RETURNS
    TABLE
        (provinces json,
         organizations json,
         persons json,
         domains json,
         holdings json
    ) AS
$BODY$
SELECT
    (SELECT
        *
    FROM
        empires.get_provinces(i_visible))
        AS provinces,
    (SELECT
        *
    FROM
        empires.get_organizations())
        AS organizations,
    (SELECT
        *
    FROM
        empires.get_persons())
        AS persons,
    (SELECT
        *
    FROM
        empires.get_domains())
        AS domains,
    (SELECT
        *
    FROM
        empires.get_holdings())
        AS holdings;
$BODY$
LANGUAGE SQL;