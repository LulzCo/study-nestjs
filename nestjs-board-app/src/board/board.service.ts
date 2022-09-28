import { Injectable, NotFoundException } from '@nestjs/common';
import { title } from 'process';
import { v1 as uuid } from 'uuid';
import { throws } from 'assert';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Repository } from 'typeorm';
import { BoardStatus } from './board.model';

@Injectable()
export class BoardService {

    constructor(
        @InjectRepository(Board)
        private boardRepository: Repository<Board> 
    ) {}

    private board: Board[] = [];
   
    getAllBoard(): Promise<Board[]> {
        return this.boardRepository.find();
    }

    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        // const title: string = createBoardDto.title;
        // const description: string = createBoardDto.description;
        const { title, description } = createBoardDto;

        // const board: Board = {
        //     id: uuid(),
        //     title,
        //     description,
        //     status: BoardStatus.PUBLIC
        // }

        // this.board.push(board);
        // return board;

        // const board = this.boardRepository.create({
        //     title,
        //     description,
        //     status: BoardStatus.PUBLIC
        // })       

        const board = await this.boardRepository.create({
            title, description, status: BoardStatus.PUBLIC,
        });
        
        return board;
    }
    
    // getBoardById(id: string): Board {
    //     const found = this.board.find((board) => board.id === id);
        
    //     if(!found) {
    //         throw new NotFoundException("Can not find board");
    //     }

    //     return found;
    // }
    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOne({
            where: {
                id,
            },
        });

        if(!found) {
            throw new NotFoundException('Can not find Board with ' + id);
        }

        return found;
    }

    deleteBoard(id: number): void {
        const found = this.getBoardById(id);
        
        this.board = this.board.filter((board) => board.id !== id);
    }

    // updateBoardStatus(id: number, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}
