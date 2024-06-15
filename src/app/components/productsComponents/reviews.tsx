'use client'

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Button, Avatar, Card, CardHeader, CardBody, CardFooter, Spinner, Input } from "@nextui-org/react";
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Review } from '@/services/definitions';
import { BASE_URL, IMAGE_USERS_BASE_URL, REVIEWS_BASE_URL } from '@/services/links';
import useUserStore from '../../../../store/authStore';

interface ReviewSectionProps {
    params: {
        id: string;
    };
}

const Reviews = ({ params }: ReviewSectionProps) => {
    const { id } = params;
    const [reviews, setReviews] = useState<Review[]>([]);
    const [rating, setRating] = useState<number>(5);
    const [comment, setComment] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const { token, user, role } = useUserStore();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`${BASE_URL}products/${id}/reviews`);
                if (!response.ok) {
                    throw new Error('Error al cargar las valoraciones');
                }
                let data: Review[] = await response.json();
                data = data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                setReviews(data);
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [id]);

    const handleRatingChange = (value: number) => {
        setRating(value);
    };

    const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (!user) {
            toast.warning("Debe registrarse para poder añadir una valoración");
            return;
        }
        try {
            const response = await fetch(REVIEWS_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ id_user: user.id, id_product: id, rating, comment }),
            });

            if (!response.ok) {
                throw new Error('Error al enviar la valoración');
            }

            const newReview: Review = await response.json();
            newReview.user = user;

            const updatedReviews = [newReview, ...reviews].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            setReviews(updatedReviews);
            setRating(5);
            setComment('');
            toast.success('Valoración enviada correctamente');
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const handleDelete = async (reviewId: string) => {
        try {
            const response = await fetch(`${REVIEWS_BASE_URL}/${reviewId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al eliminar la valoración');
            }

            setReviews(reviews.filter(review => review.id !== reviewId));
            toast.success('Valoración eliminada correctamente');
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    onClick={() => handleRatingChange(i)}
                    style={{ cursor: 'pointer', color: i <= rating ? '#ffd700' : '#e4e5e9' }}
                >
                    ★
                </span>
            );
        }
        return stars;
    };

    const calculateAverageRating = (reviews: Review[]) => {
        if (reviews.length === 0) return "-";
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        return (totalRating / reviews.length).toFixed(1);
    };

    return (
        <div className="container mx-auto p-4 my-8 max-w-screen-lg">
            <h2 className="text-2xl font-bold mb-2">Valoraciones ({calculateAverageRating(reviews)}/5)</h2>
            {reviews.length > 0 && <h4 className="italic mb-8">({reviews.length} valoraciones)</h4>}
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="mb-4">
                    <Input
                        placeholder="Escribe tu valoración aquí..."
                        value={comment}
                        onChange={handleCommentChange}
                        fullWidth
                    />
                </div>
                <div className="mb-4">
                    {renderStars(rating)}
                </div>
                <Button type="submit" color='warning' className='text-white' variant='shadow'>Enviar Valoración</Button>
            </form>
            {loading ? (
                <Spinner size="lg" />
            ) : (
                <div>
                    {reviews.length === 0 ? (
                        <p>Aún no hay valoraciones... ¡Haz la primera!</p>
                    ) : (
                        reviews.map((review) => (
                            <Card key={review.id} className="mb-4">
                                <CardHeader className="justify-between flex">
                                    <div className="flex gap-5">
                                        <Avatar
                                            isBordered
                                            radius="full"
                                            size="md"
                                            src={review.user && review.user.image ? `${IMAGE_USERS_BASE_URL}${review.user.image}` : '/images/user.png'}
                                        />
                                        <div className="flex flex-col gap-1 items-start justify-center">
                                            <h4 className="text-small font-semibold leading-none text-default-600">
                                                {review.user ? `${review.user.name} ${review.user.surname}` : 'Usuario desconocido'}
                                            </h4>
                                            <h5 className="text-small tracking-tight text-default-400">
                                                {review.user ? review.user.email : 'Correo no disponible'}
                                            </h5>
                                            <div>{renderStars(review.rating)}</div>
                                        </div>
                                    </div>
                                    {(role && (role.includes('admin') || role.includes('super-admin')) || (user && user.id === review.id_user)) && (
                                        <Button color="danger" onClick={() => handleDelete(review.id)}>
                                            <FaTrashAlt /> Eliminar
                                        </Button>
                                    )}
                                </CardHeader>
                                <CardBody className="px-3 py-0 text-small text-default-400">
                                    <p>{review.comment}</p>
                                </CardBody>
                                <CardFooter className="gap-3">
                                    <p className="text-default-400 text-small">Fecha: {new Date(review.created_at).toLocaleDateString()}</p>
                                </CardFooter>
                            </Card>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Reviews;
