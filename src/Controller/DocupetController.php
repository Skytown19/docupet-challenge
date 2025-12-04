<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Response;

class DocupetController extends AbstractController
{
    #[Route('/')]
    public function home(): Response
    {
        return $this->render('dangerous_animal.html.twig');
    }
}
