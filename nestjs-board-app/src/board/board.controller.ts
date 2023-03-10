import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { throws } from 'assert';
import { BoardStatusValidationPipe } from 'src/pipes/board-status-validation.pipe';
import { Board } from './board.model';
import { BoardStatus } from './board-status.enum';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('board')
export class BoardController {
    constructor(private boardService: BoardService) {}

    @Get()
    getAllBoard(): Promise<Board[]> {
        return this.boardService.getAllBoard();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardService.createBoard(createBoardDto);

    }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {
        // return this.boardService.getBoardById(id);
        return this.boardService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id') id: number): void {
        this.boardService.deleteBoard(id);
    }

    // @Patch('/:id/status') 
    // updateBoardStatus(
    //     @Param('id') id: number,
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    // ) {
    //     return this.boardService.updateBoardStatus(id, status);
    // }


}
