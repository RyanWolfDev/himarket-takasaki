-- CreateTable
CREATE TABLE `Lojas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `donoId` INTEGER NOT NULL,
    `nomeLoja` VARCHAR(255) NOT NULL,
    `dominio` VARCHAR(255) NOT NULL,
    `servidorPrincipal` VARCHAR(255) NOT NULL,
    `expirar` VARCHAR(255) NOT NULL,
    `equipe` VARCHAR(255) NULL,
    `produtos` VARCHAR(255) NULL,
    `pedidos` VARCHAR(255) NULL,
    `vendas` VARCHAR(255) NULL,
    `relatorios` VARCHAR(255) NULL,
    `servidores` VARCHAR(255) NULL,
    `termos` VARCHAR(255) NULL,
    `configuracoes` VARCHAR(255) NULL,
    `noticias` VARCHAR(255) NULL,
    `redes` VARCHAR(255) NULL,
    `modulos` VARCHAR(255) NULL,
    `integracao` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Lojas_nomeLoja_key`(`nomeLoja`),
    UNIQUE INDEX `Lojas_dominio_key`(`dominio`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Lojas` ADD CONSTRAINT `Lojas_donoId_fkey` FOREIGN KEY (`donoId`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
