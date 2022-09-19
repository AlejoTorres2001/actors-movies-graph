export class ReadActorDto {
  id: number;
  name: string;
  birthYear: number;
  appearances: { id: number }[];
}
