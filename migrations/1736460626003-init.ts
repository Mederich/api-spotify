import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1736460626003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
CREATE TABLE "music" ("musicId" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "artiste" varchar NOT NULL, "genre" varchar NOT NULL)
CREATE TABLE "playlist" ("playlistId" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "playlistname" varchar NOT NULL, "userUserId" integer)
CREATE TABLE "user" ("userId" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL)
CREATE TABLE "playlist_musics_music" ("playlistPlaylistId" integer NOT NULL, "musicMusicId" integer NOT NULL, PRIMARY KEY ("playlistPlaylistId", "musicMusicId"))
CREATE INDEX "IDX_c4fac2eb7abb6c1c9e2bce5c78" ON "playlist_musics_music" ("playlistPlaylistId")
CREATE INDEX "IDX_6c2bd9b7e7437fbc2b6d5b20f1" ON "playlist_musics_music" ("musicMusicId")
CREATE TABLE "temporary_playlist" ("playlistId" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "playlistname" varchar NOT NULL, "userUserId" integer, CONSTRAINT "FK_a9c9941222ada9c54d285202377" FOREIGN KEY ("userUserId") REFERENCES "user" ("userId") ON DELETE CASCADE ON UPDATE NO ACTION)
INSERT INTO "temporary_playlist"("playlistId", "playlistname", "userUserId") SELECT "playlistId", "playlistname", "userUserId" FROM "playlist"
DROP TABLE "playlist"
ALTER TABLE "temporary_playlist" RENAME TO "playlist"
DROP INDEX "IDX_c4fac2eb7abb6c1c9e2bce5c78"
DROP INDEX "IDX_6c2bd9b7e7437fbc2b6d5b20f1"
CREATE TABLE "temporary_playlist_musics_music" ("playlistPlaylistId" integer NOT NULL, "musicMusicId" integer NOT NULL, CONSTRAINT "FK_c4fac2eb7abb6c1c9e2bce5c78d" FOREIGN KEY ("playlistPlaylistId") REFERENCES "playlist" ("playlistId") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_6c2bd9b7e7437fbc2b6d5b20f15" FOREIGN KEY ("musicMusicId") REFERENCES "music" ("musicId") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("playlistPlaylistId", "musicMusicId"))
INSERT INTO "temporary_playlist_musics_music"("playlistPlaylistId", "musicMusicId") SELECT "playlistPlaylistId", "musicMusicId" FROM "playlist_musics_music"
DROP TABLE "playlist_musics_music"
ALTER TABLE "temporary_playlist_musics_music" RENAME TO "playlist_musics_music"
CREATE INDEX "IDX_c4fac2eb7abb6c1c9e2bce5c78" ON "playlist_musics_music" ("playlistPlaylistId")
CREATE INDEX "IDX_6c2bd9b7e7437fbc2b6d5b20f1" ON "playlist_musics_music" ("musicMusicId")
COMMIT
PRAGMA foreign_keys = ON
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
