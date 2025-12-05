<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\Pet;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class PetController extends AbstractController
{
    #[Route('/pet', name: 'create_pet', methods: ['POST'])]
    public function createPet(Request $request, EntityManagerInterface $entityManager): Response {
        $pet = new Pet();
        $pet->setName($request->getPayload()->get('name'));
        $pet->setSex($request->getPayload()->get('sex'));

        $entityManager->persist($pet);
        $entityManager->flush();

        return new Response('Created Pet: ' . $pet->getName() );
    }
}
