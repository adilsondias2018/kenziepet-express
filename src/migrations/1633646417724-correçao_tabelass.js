const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class correçaoTabelass1633646417724 {
    name = 'correçaoTabelass1633646417724'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "characteristic" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "group" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "scientific_name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "animal" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "age" integer NOT NULL, "weight" integer NOT NULL, "sex" varchar NOT NULL, "groupsId" integer)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "is_superuser" boolean NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "animal_characteristics_characteristic" ("animalId" integer NOT NULL, "characteristicId" integer NOT NULL, PRIMARY KEY ("animalId", "characteristicId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a7c8724a03670ddb68025b2e10" ON "animal_characteristics_characteristic" ("animalId") `);
        await queryRunner.query(`CREATE INDEX "IDX_980da0ee151bb3ced85b6b797a" ON "animal_characteristics_characteristic" ("characteristicId") `);
        await queryRunner.query(`CREATE TABLE "temporary_animal" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "age" integer NOT NULL, "weight" integer NOT NULL, "sex" varchar NOT NULL, "groupsId" integer, CONSTRAINT "FK_017c65f4695aa24bb0c5657fd4e" FOREIGN KEY ("groupsId") REFERENCES "group" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_animal"("id", "name", "age", "weight", "sex", "groupsId") SELECT "id", "name", "age", "weight", "sex", "groupsId" FROM "animal"`);
        await queryRunner.query(`DROP TABLE "animal"`);
        await queryRunner.query(`ALTER TABLE "temporary_animal" RENAME TO "animal"`);
        await queryRunner.query(`DROP INDEX "IDX_a7c8724a03670ddb68025b2e10"`);
        await queryRunner.query(`DROP INDEX "IDX_980da0ee151bb3ced85b6b797a"`);
        await queryRunner.query(`CREATE TABLE "temporary_animal_characteristics_characteristic" ("animalId" integer NOT NULL, "characteristicId" integer NOT NULL, CONSTRAINT "FK_a7c8724a03670ddb68025b2e102" FOREIGN KEY ("animalId") REFERENCES "animal" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_980da0ee151bb3ced85b6b797a4" FOREIGN KEY ("characteristicId") REFERENCES "characteristic" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("animalId", "characteristicId"))`);
        await queryRunner.query(`INSERT INTO "temporary_animal_characteristics_characteristic"("animalId", "characteristicId") SELECT "animalId", "characteristicId" FROM "animal_characteristics_characteristic"`);
        await queryRunner.query(`DROP TABLE "animal_characteristics_characteristic"`);
        await queryRunner.query(`ALTER TABLE "temporary_animal_characteristics_characteristic" RENAME TO "animal_characteristics_characteristic"`);
        await queryRunner.query(`CREATE INDEX "IDX_a7c8724a03670ddb68025b2e10" ON "animal_characteristics_characteristic" ("animalId") `);
        await queryRunner.query(`CREATE INDEX "IDX_980da0ee151bb3ced85b6b797a" ON "animal_characteristics_characteristic" ("characteristicId") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "IDX_980da0ee151bb3ced85b6b797a"`);
        await queryRunner.query(`DROP INDEX "IDX_a7c8724a03670ddb68025b2e10"`);
        await queryRunner.query(`ALTER TABLE "animal_characteristics_characteristic" RENAME TO "temporary_animal_characteristics_characteristic"`);
        await queryRunner.query(`CREATE TABLE "animal_characteristics_characteristic" ("animalId" integer NOT NULL, "characteristicId" integer NOT NULL, PRIMARY KEY ("animalId", "characteristicId"))`);
        await queryRunner.query(`INSERT INTO "animal_characteristics_characteristic"("animalId", "characteristicId") SELECT "animalId", "characteristicId" FROM "temporary_animal_characteristics_characteristic"`);
        await queryRunner.query(`DROP TABLE "temporary_animal_characteristics_characteristic"`);
        await queryRunner.query(`CREATE INDEX "IDX_980da0ee151bb3ced85b6b797a" ON "animal_characteristics_characteristic" ("characteristicId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a7c8724a03670ddb68025b2e10" ON "animal_characteristics_characteristic" ("animalId") `);
        await queryRunner.query(`ALTER TABLE "animal" RENAME TO "temporary_animal"`);
        await queryRunner.query(`CREATE TABLE "animal" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "age" integer NOT NULL, "weight" integer NOT NULL, "sex" varchar NOT NULL, "groupsId" integer)`);
        await queryRunner.query(`INSERT INTO "animal"("id", "name", "age", "weight", "sex", "groupsId") SELECT "id", "name", "age", "weight", "sex", "groupsId" FROM "temporary_animal"`);
        await queryRunner.query(`DROP TABLE "temporary_animal"`);
        await queryRunner.query(`DROP INDEX "IDX_980da0ee151bb3ced85b6b797a"`);
        await queryRunner.query(`DROP INDEX "IDX_a7c8724a03670ddb68025b2e10"`);
        await queryRunner.query(`DROP TABLE "animal_characteristics_characteristic"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "animal"`);
        await queryRunner.query(`DROP TABLE "group"`);
        await queryRunner.query(`DROP TABLE "characteristic"`);
    }
}
