<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251206192533 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE dangerous_breed (id INT AUTO_INCREMENT NOT NULL, breed_id INT NOT NULL, INDEX IDX_C1CAFC9A8B4A30F (breed_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE dangerous_breed ADD CONSTRAINT FK_C1CAFC9A8B4A30F FOREIGN KEY (breed_id) REFERENCES breed (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE dangerous_breed DROP FOREIGN KEY FK_C1CAFC9A8B4A30F');
        $this->addSql('DROP TABLE dangerous_breed');
    }
}
