<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251206172842 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE breed (id INT AUTO_INCREMENT NOT NULL, type VARCHAR(255) NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE pet (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, sex VARCHAR(255) NOT NULL, date_of_birth DATE NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE pet_breed (pet_id INT NOT NULL, breed_id INT NOT NULL, INDEX IDX_55D348EC966F7FB6 (pet_id), INDEX IDX_55D348ECA8B4A30F (breed_id), PRIMARY KEY (pet_id, breed_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE pet_breed ADD CONSTRAINT FK_55D348EC966F7FB6 FOREIGN KEY (pet_id) REFERENCES pet (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE pet_breed ADD CONSTRAINT FK_55D348ECA8B4A30F FOREIGN KEY (breed_id) REFERENCES breed (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE pet_breed DROP FOREIGN KEY FK_55D348EC966F7FB6');
        $this->addSql('ALTER TABLE pet_breed DROP FOREIGN KEY FK_55D348ECA8B4A30F');
        $this->addSql('DROP TABLE breed');
        $this->addSql('DROP TABLE pet');
        $this->addSql('DROP TABLE pet_breed');
    }
}
