import { Injectable, NotFoundException } from '@nestjs/common';
import { title } from 'process';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { throws } from 'assert';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardService {
    private board: Board[] = [];
   
    getAllBoard(): Board[] {
        return this.board;
    }

    createBoard(createBoardDto: CreateBoardDto): Board {
        // const title: string = createBoardDto.title;
        // const description: string = createBoardDto.description;
        const { title, description } = createBoardDto;

        const board: Board = {
            id: uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC
        }

        this.board.push(board);
        return board;
    }
    
    getBoardById(id: string): Board {
        const found = this.board.find((board) => board.id === id);
        
        if(!found) {
            throw new NotFoundException("Can not find board");
        }

        return found;
    }

    deleteBoard(id: string): void {
        const found = this.getBoardById(id);
        
        this.board = this.board.filter((board) => board.id !== id);
    }

    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
}
